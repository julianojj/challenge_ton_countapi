export default {
    openapi: '3.0.0',
    info: {
        title: 'Counter API',
        version: '1.3.0'
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    paths: {
        '/visits/{url}': {
            get: {
                tags: ['Visits'],
                operationId: 'getVisits',
                description: 'Get total visits for url',
                parameters: [
                    {
                        in: 'path',
                        name: 'url',
                        required: true,
                        schema: {
                            type:'string',
                            example: 'ton.com.br'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/GetVisitsOutput'
                                }
                            }
                        }
                    },
                    '422': {
                        description: 'Validation exception',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/ValidationException'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/visits/hit/{url}': {
            post: {
                tags: ['Visits'],
                operationId: 'IncrementVisits',
                description: 'Increment total visits for url',
                parameters: [
                    {
                        in: 'path',
                        name: 'url',
                        required: true,
                        schema: {
                            type:'string',
                            example: 'ton.com.br'
                        }
                    }
                ],
                responses: {
                    '204': {
                        description: 'Successful response'
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            ValidationException: {
                type: 'object',
                properties: {
                    code: {
                        type:'integer',
                        example: 422,
                    },
                    message: {
                        type:'string',
                        example: 'Error to get ton.com.br'
                    }
                }
            },
            IncrementVisitsInput: {
                type: 'object',
                properties: {
                    url: {
                        type:'string'
                    }
                },
                required: ['url']
            },
            GetVisitsOutput: {
                type: 'object',
                properties: {
                    url: {
                        type: 'string',
                        example: 'ton.com.br'
                    },
                    visits: {
                        type: 'integer',
                        example: 1
                    }
                }
            }
        }
    }
}
