# smarthomegcp

#### Tell your assistant what happened today with this serverless one sentence a day diary logger.


### Uses

*  Google Cloud Platform
*  Dialogflow
*  Node
*  Javascript

### Dialogflow

Trained to differentiate between date and diary entry. 

**Example:**

User: *"Today I found a pile of nickles next to my shoe."*

VA: *Sounds like you had a day. I've saved your journal entry for* DATE *"*

If user does not include date or sentence, user will be prompted by virtual assistant to speak date or sentence until information is succesfully logged.

**Example:**

User: *"I listened to Prince."*

VA: *"When did this happen?"*

User: *"Yesterday."*

VA: *"Got your entry for* DATE *"*


If virtual assistant does not understand user, the virtual assistant will declare its lack of comprehension.

**Example:**

VA: *"I missed that, say that again"*
