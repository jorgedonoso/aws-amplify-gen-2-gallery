# AWS Amplify Gen 2 Gallery

Image gallery built with **React, Vite, AWS Amplify Gen 2, Amazon S3, and Amazon DynamoDB**.

Browse and filter AI-generated profiles using metadata stored in DynamoDB and images stored in S3.

> ⚠️ **All people shown are AI-generated.**

![Gallery](./docs/demo.png)

## DynamoDB Query Design

The profile data is stored in DynamoDB with a **Global Secondary Index (GSI)** designed around the gallery's primary filters using:

- **Partition key:** `Gender + Ethnicity`
- **Sort key:** `Age`

This allows the application to efficiently query profiles by gender and ethnicity while using age as the sort key for age-based filtering and ordering.

This index was chosen to match the gallery's most common filtering pattern while avoiding full-table scans as the dataset grows.

## Tech Stack

- **AWS Amplify Gen 2**
- **AppSync / Amplify Data**
- **Amazon DynamoDB**
- **Amazon S3**
- **React + Vite**
- **TypeScript**
- **Tailwind CSS**

## Architecture

```mermaid
flowchart LR
    subgraph Client["Client"]
        App["React + Vite"]
    end

    subgraph AWS["AWS"]
        subgraph Amplify["Amplify Gen 2"]
            API["AppSync<br/>Amplify Data"]
            Storage["Amplify Storage"]
        end

        DB[("DynamoDB<br/>Profile Metadata")]
        S3[("S3<br/>Profile Images")]
    end

    App -->|"Query / filter"| API
    API -->|"Read profiles"| DB

    App -->|"Get image URL"| Storage
    Storage -->|"Access objects"| S3

    classDef client fill:#f5f7fa,stroke:#64748b,stroke-width:2px,color:#111
    classDef amplify fill:#fff8eb,stroke:#d97706,stroke-width:2px,color:#111
    classDef database fill:#f5f7fa,stroke:#475569,stroke-width:2px,color:#111

    class App client
    class API,Storage amplify
    class DB,S3 database
```

## Dataset

Profile images and metadata are based on the **Generated Photos Academic Dataset**.

**Dataset:** [Generated Photos Academic Dataset on Kaggle](https://www.kaggle.com/datasets/generatedphotos/generated-photos-academic-dataset?utm_source=chatgpt.com)

Please refer to the dataset provider's terms and licensing before using the dataset.

## Running Locally

Download the dataset and migrate the profile data and images into your DynamoDB and S3 resources.

```bash
npm install
npm run dev
```

To run the local Amplify backend:

```bash
npx ampx sandbox
```

## Author

Jorge Donoso
