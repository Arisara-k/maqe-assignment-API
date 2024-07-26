import { test, expect } from '@playwright/test';
import { Jsonplaceholder } from '../page-object/jsonplaceholder';
const expectedResult = require('../public/expectedResult/jsonplaceholder.json')
let onJsonplaceholder: Jsonplaceholder = new Jsonplaceholder()
const existingId = '40'
const notExistingId = '500'
const userId = '7'

test('Get post list', async () => {
  const respond = await onJsonplaceholder.callGetApi()
  await onJsonplaceholder.verifyCallGetApiList(respond.statusCode, respond, expectedResult.sendSuccess)
  console.log('=====Get post list======',respond)
})

test('Get post by existing id', async () => {
  const respond = await onJsonplaceholder.callGetApiWithId(existingId)
  await onJsonplaceholder.verifyCallGetApiById(respond.statusCode, respond, expectedResult.sendSuccess, existingId)
  console.log('======Get post by existing id=====',respond)
})

test('Get post by not existing id', async () => {
  const respond = await onJsonplaceholder.callGetApiWithId(notExistingId)
  await onJsonplaceholder.verifyCallGetApiByNotExistingId(respond.statusCode, respond, expectedResult.scanNotFound)
  console.log('======Get post by NOT existing id=====',respond)
})

test('Get post list and filter by user id', async () => {
  const respond = await onJsonplaceholder.callGetApiWithUserId(userId)
  await onJsonplaceholder.verifyCallGetApiByUserId(respond.statusCode, respond, expectedResult.mockDataScanByUserId)
  console.log('======Get post list and filter by user id=====',respond)
})

test('Create post', async () => {
  const respond = await onJsonplaceholder.callPostApi()
  await onJsonplaceholder.verifyCallPostApi(respond.statusCode, respond, expectedResult.sendPostSuccess)
  console.log('======Create post=====',respond)
})

test('Update post title and post body by existing id', async () => {
  const respond = await onJsonplaceholder.callPutApiWithId(existingId)
  await onJsonplaceholder.verifyCallPutApi(respond.statusCode, respond, expectedResult.sendPutSuccess)
  console.log('======Update post title and post body by existing id=====',respond)
})

test('Update post title by existing id', async () => {
  const respond = await onJsonplaceholder.callPatchApiWithId(existingId)
  await onJsonplaceholder.verifyCallPatchApi(respond.statusCode, respond, expectedResult.sendPatchSuccess)
  console.log('======Update post title by existing id=====',respond)
})

test('Delete post', async () => {
  const respond = await onJsonplaceholder.callDeleteApiWithId(existingId)
  await onJsonplaceholder.verifyCallDeleteApi(respond.statusCode, respond, expectedResult.sendDeleteSuccess)
  console.log('======Delete post=====',respond)
})