import { Injectable } from '@nestjs/common';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { QdrantVectorStore } from '@langchain/qdrant';
import { ChatOllama, OllamaEmbeddings } from '@langchain/ollama';
import { ChatPromptTemplate, PromptTemplate } from '@langchain/core/prompts';
import { MultiQueryRetriever } from 'langchain/retrievers/multi_query';
import { BaseRetrieverInterface } from '@langchain/core/retrievers';

@Injectable()
export class DocumentProcessorService {
  async processDocument(filePath: string) {
    // const loader = new PDFLoader(filePath);
    // const documents = await loader.load();
    const embeddings = new OllamaEmbeddings({
      model: 'nomic-embed-text', // Default value
      baseUrl: 'http://localhost:11434', // Default value
    });

    const vectorStore = await QdrantVectorStore.fromExistingCollection(
      embeddings,
      {
        url: 'http://localhost:6333',
        collectionName: 'langchainjs-testing',
      },
    );

    // await vectorStore.addDocuments(documents);
    this.askAiModel(vectorStore);
  }

  async askAiModel(vectorStore) {
    console.log('in the ask ai model >>>>>>>>>>>>>');
    const llm = new ChatOllama({
      model: 'mistral',
      temperature: 0,
      maxRetries: 2,
    });

    const promptTemplate = PromptTemplate.fromTemplate(
      'You are an AI model Assistant. Your Task is to generate five different versions of the given user question to retrieve releveant documents from a vector database. By generating multiple perspectives on the user question, your goal is to help the user overcome some of the limitations of the distance-based similarity search. Provide these alternatives questions separated by newlines. Original question: {question}',
    );

    // await promptTemplate.invoke({ question: 'what is this document about?' });

    const retriver = MultiQueryRetriever.fromLLM({
      retriever: vectorStore?.asRetriever(),
      llm,
      prompt: promptTemplate,
    });

    const context = await retriver.invoke("what is this document about?")
    console.log(context, '>>>>>>>>>>>>>')

    const template =
      'Answer the question based ONLY on the following context: {context} Question: {question}';
    const prompt = ChatPromptTemplate.fromTemplate(template);
    const chain = prompt.pipe(llm);
    console.log(
      '>>>>>>>>>>>>>>>>>>>>>',
      await chain.invoke({
        context: context,
        question: 'what is this document about?',
      }),
      '>>>>>>>>>>>>>>>>>>>>>>>>>>>',
    );
  }
}
