export type AmplifyDependentResourcesAttributes = {
    "api": {
        "TernaEMS": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    },
    "auth": {
        "TernaEMS": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        },
        "userPoolGroups": {
            "AdminsGroupRole": "string",
            "StudentsGroupRole": "string"
        }
    },
    "storage": {
        "s3ternaemsstorage3a6a3a0c": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "TernaEMSPostConfirmation": {
            "Name": "string",
            "Arn": "string",
            "LambdaExecutionRole": "string",
            "Region": "string"
        }
    }
}