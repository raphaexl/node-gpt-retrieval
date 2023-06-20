# node-gpt-retrieval

Simple script to use ChatGPT on your own files.

Here's the [YouTube Video](https://youtu.be/9AXP7tCI9PI).

## Installation

Install [Langchain](https://github.com/hwchase17/langchain).
```
npm install dotenv
npm install hnswlib-node
npm install langchain
```
Modify `.env` to use your own [OpenAI API key](https://platform.openai.com/account/api-keys). and PERSIT to loop ...

Place your own data into `data.txt`.

## Example usage
```
> npm start
> what is my dog's name
Your dog's name is Sunny.
```