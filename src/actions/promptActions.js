import * as types from './actionTypes';
import fb from '../config/initializeFirebase';
var db = fb.database();

export function sendPrompt(prompt, promptResponses) {
  return async function (dispatch) {
    try {
      dispatch(sendPromptAttempt())

      // insert new prompt into /prompts/
      var newPromptKey = db.ref('/prompts').push().key
      var promptData = {
        prompt: prompt,
        promptResponses: promptResponses,
        timestamp: Date.now(),
        recipients: 'all',
      }

      var updates = {}
      updates['/prompts/' + newPromptKey] = promptData

      // insert new prompt message into each message thread
      var newPromptMessage = {
        message: prompt,
        responses: promptResponses,
        sender_id: 'prompt',
        timestamp: Date.now()
      }
      // get all thread_ids
      // update /messages for that thread_id
      var allThreadsRef = db.ref('/threads')
      var allThreads;
      allThreadsRef.on('value', async function(snapshot) {
        allThreads = snapshot.val()
        for (var thread_id in allThreads) {
          console.log(thread_id)
          var newThreadMsgKey = db.ref('/messages').push().key
          console.log(newThreadMsgKey)
          updates['/messages/' + thread_id + '/' + newThreadMsgKey] = newPromptMessage
        }
        console.log(updates)
        await db.ref().update(updates)
        dispatch(sendPromptSuccess(promptData))
      })
    } catch(err) {
      console.log(err)
      dispatch(sendPromptFailure())
    }
  }
}

function sendPromptAttempt(promptData) {
  return {
    type: types.SEND_PROMPT_ATTEMPT,
    promptData
  }
}

function sendPromptSuccess() {
  return {
    type: types.SEND_PROMPT_SUCCESS
  }
}

function sendPromptFailure() {
  return {
    type: types.SEND_PROMPT_FAILURE
  }
}