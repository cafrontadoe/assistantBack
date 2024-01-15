import { Request, Response } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: "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",
});

let threadByUser: any; // Store thread IDs by user
let chatObject: ChatObject;


class ChatController {
  chatObject = new ChatObject();


  public async health(req: Request, res: Response): Promise<void> {
    try {
      const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: "Say hello world in turkey" }],
        model: "gpt-3.5-turbo",
      });
      console.log("--------------- 3");
      res.status(200).json(response);
      // const contacts = await Contact.find();
      // res.status(200).json("mileto");
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "internal error service" });
    }
   }



  public async chatAssistant(req: Request, res: Response): Promise<void> {
  

    const assistantIdToUse = "asst_A9nEPE3ihrQWMisYAGvZDiCi"; // Replace with your assistant ID
    const userId = req.body.userId; // You should include the user ID in the request
  

    // Create a new thread if it's the user's first message
    if (threadByUser === undefined || !threadByUser[userId]) {
      threadByUser = [];
      try {
        const myThread = await openai.beta.threads.create();
        console.log("New thread created with ID: ", myThread.id, "\n");
        threadByUser[userId] = myThread.id; // Store the thread ID for this user
      } catch (error) {
        console.error("Error creating thread:", error);
        res.status(500).json({ error: "Internal server error" });
        return;
      }
    }
    chatObject.thread = threadByUser[userId];

    const userMessage = req.body.message;

    chatObject.messages?.push(userMessage);

    // Add a Message to the Thread
    try {
      const myThreadMessage = await openai.beta.threads.messages.create(
        threadByUser[userId], // Use the stored thread ID for this user
        {
          role: "user",
          content: userMessage,
        }
      );
      console.log("This is the message object: ", myThreadMessage, "\n");

      // Run the Assistant
      const myRun = await openai.beta.threads.runs.create(
        threadByUser[userId], // Use the stored thread ID for this user
        {
          assistant_id: assistantIdToUse,
          // instructions:
          //   "hi",
          tools: [
            // { type: "code_interpreter" }, // Code interpreter tool
            // { type: "retrieval" }, // Retrieval tool
          ],
        }
      );
      console.log("This is the run object: ", myRun, "\n");

      // Periodically retrieve the Run to check on its status
      const retrieveRun = async () => {
        let keepRetrievingRun;

        while (myRun.status !== "completed") {
          keepRetrievingRun = await openai.beta.threads.runs.retrieve(
            threadByUser[userId], // Use the stored thread ID for this user
            myRun.id
          );

          console.log(`Run status: ${keepRetrievingRun.status}`);

          if (keepRetrievingRun.status === "completed") {
            console.log("\n");
            break;
          }
        }
      };
      retrieveRun();

      // Retrieve the Messages added by the Assistant to the Thread
      const waitForAssistantMessage = async () => {
        await retrieveRun();

        const allMessages = await openai.beta.threads.messages.list(
          threadByUser[userId] // Use the stored thread ID for this user
        );

        
        const content: any = allMessages.data[0].content.at(0);
        
        const assistantMessage = content.text.value;
        chatObject.messages?.push(assistantMessage);

        // Send the response back to the front end
        res.status(200).json({
          response: assistantMessage,
        });
        console.log(
          "------------------------------------------------------------ \n"
        );

      };
      waitForAssistantMessage();
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // public async simpleChat(req: Request, res: Response): Promise<void> {
  //   try {
  //     const response = await openai.chat.completions.create({
  //       messages: [{ role: "user", content: "Say hello world in turkey" }],
  //       model: "gpt-3.5-turbo",
  //     });
  //     console.log("--------------- 3");
  //     res.status(200).json(response);
  //     // const contacts = await Contact.find();
  //     // res.status(200).json("mileto");
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "internal error service" });
  //   }
  // }
}

export default ChatController;


class ChatObject {
  thread?: string;
  messages?: Array<String>;
  date?: Date;

  constructor() {
    this.messages = [];
  }

}



