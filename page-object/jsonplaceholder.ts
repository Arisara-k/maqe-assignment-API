import { expect, APIRequestContext, request } from '@playwright/test'

export class Jsonplaceholder {
    private async createContextIssueHTTPRequest(){
        return await request.newContext({
            baseURL : 'https://jsonplaceholder.typicode.com'
        })
    }

    async callGetApi() {
        const sendRequest =  await this.createContextIssueHTTPRequest()
        const result = await sendRequest.get('/posts')
        return {
            statusCode : result.status(),
            statusText : result.statusText(),
            body : await result.json(),
        }
    }

    async callGetApiWithId(id: string) {
        const sendRequest =  await this.createContextIssueHTTPRequest()
        const result = await sendRequest.get(`/posts/${id}`)
        return {
            statusCode : result.status(),
            statusText : result.statusText(),
            body : await result.json(),
        }
    }

    async callGetApiWithUserId(userId: string) {
        const sendRequest =  await this.createContextIssueHTTPRequest()
        const result = await sendRequest.get(`/posts?userId=${userId}`)
        return {
            statusCode : result.status(),
            statusText : result.statusText(),
            body : await result.json(),
        }
    }

    async callPostApi() {
        const sendRequest =  await this.createContextIssueHTTPRequest()
        const result = await sendRequest.post('/posts' , {
            data : {
                    "title": "Create Post",
                    "body": "Test",
                    "userId": 11
                }
            })
        return {
            statusCode : result.status(),
            statusText : result.statusText(),
            body : await result.json(),
        }
    }

    async callPutApiWithId(id: string) {
        const sendRequest =  await this.createContextIssueHTTPRequest()
        const result = await sendRequest.put(`/posts/${id}` , {
            data : {
                    "title": "Upadate title",
                    "body": "Upadate body",
                    "userId": 1
                }
            })
        return {
            statusCode : result.status(),
            statusText : result.statusText(),
            body : await result.json(),
        }
    }

    async callPatchApiWithId(id: string) {
        const sendRequest =  await this.createContextIssueHTTPRequest()
        const result = await sendRequest.patch(`/posts/${id}` , {
            data : {
                    "title": "Upadate title"
                }
            })
        return {
            statusCode : result.status(),
            statusText : result.statusText(),
            body : await result.json(),
        }
    }

    async callDeleteApiWithId(id: string) {
        const sendRequest =  await this.createContextIssueHTTPRequest()
        const result = await sendRequest.delete(`/posts/${id}`)
        return {
            statusCode : result.status(),
            statusText : result.statusText(),
            body : await result.json(),
        }
    }

    async verifyCallGetApiList(statusCode, actualResult, expectedResult) {
        expect(statusCode).toBe(200)
        for(let i = 0 ; i < actualResult.body.length ; i++){
            expect(actualResult.body[i]).toEqual(expectedResult.data[i])
        }
    }

    async verifyCallGetApiById(statusCode, actualResult, expectedResult, id) {
        expect(statusCode).toBe(200)
        expect(actualResult.body).toEqual(expectedResult.data[id - 1])
    }

    async verifyCallGetApiByNotExistingId(statusCode, actualResult, expectedResult) {
        expect(statusCode).toBe(404)
        expect(actualResult.body).toEqual({})
        expect(actualResult.statusText).toEqual(expectedResult.statusText)
    }

    async verifyCallGetApiByUserId(statusCode, actualResult, expectedResult) {
        expect(statusCode).toBe(200)
        for(let i = 0 ; i < actualResult.body.length ; i++){
            expect(actualResult.body[i]).toEqual(expectedResult.data[i])
        }
    }

    async verifyCallPostApi(statusCode, actualResult, expectedResult) {
        expect(statusCode).toBe(201)
        expect(actualResult.body).toEqual(expectedResult.data)
        expect(actualResult.statusText).toEqual(expectedResult.statusText)
    }

    async verifyCallPutApi(statusCode, actualResult, expectedResult) {
        expect(statusCode).toBe(200)
        expect(actualResult.body).toEqual(expectedResult.data)
        expect(actualResult.statusText).toEqual(expectedResult.statusText)
    }

    async verifyCallPatchApi(statusCode, actualResult, expectedResult) {
        expect(statusCode).toBe(200)
        expect(actualResult.body).toEqual(expectedResult.data)
        expect(actualResult.statusText).toEqual(expectedResult.statusText)
    }

    async verifyCallDeleteApi(statusCode, actualResult, expectedResult) {
        expect(statusCode).toBe(200)
        expect(actualResult.body).toEqual({})
        expect(actualResult.statusText).toEqual(expectedResult.statusText)
    }
}