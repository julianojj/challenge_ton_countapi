const ip = process.env.PUBLIC_IP
const url = `http://${ip}:3000`

export default {
    openapi: '3.0.0',
    info: {
        title: 'Counter API',
        version: '1.7.0'
    },
    servers: [
        {
            url
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
                            type: 'string',
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
            },

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
                            type: 'string',
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
        },
        '/users': {
            post: {
                tags: ['Users'],
                operationId: 'createUser',
                description: 'Create user',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/CreateUserInput'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/CreateUserOutput'
                                }
                            }
                        }
                    },
                    '422': {
                        description: 'Error: Unprocessable Entity',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UserAlreadyExists'
                                }
                            }
                        }
                    }
                }
            },
        },
        '/users/{userId}': {
            get: {
                tags: ['Users'],
                operationId: 'getUser',
                description: 'Get user',
                parameters: [
                    {
                        in: 'path',
                        name: 'userId',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Successful response',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/GetUserOutput'
                                }
                            }
                        }
                    },
                    '422': {
                        description: 'Error: Unprocessable Entity',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/UserNotFound'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    components: {
        schemas: {
            UserNotFound: {
                type: 'object',
                properties: {
                    code: {
                        type:'string'
                    },
                    message: {
                        type:'string',
                        example: 'User not found'
                    }
                }
            },
            UserAlreadyExists: {
                type: 'object',
                properties: {
                    code: {
                        type: 'integer',
                        example: 422
                    },
                    message: {
                        type:'string',
                        example: 'User Already Exists'
                    }
                }
            },
            ValidationException: {
                type: 'object',
                properties: {
                    code: {
                        type: 'integer',
                        example: 422,
                    },
                    message: {
                        type: 'string',
                        example: 'Error to get ton.com.br'
                    }
                }
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
            },
            CreateUserInput: {
                type: 'object',
                properties: {
                    name: {
                        type: 'string',
                        example: 'ton'
                    },
                    email: {
                        type: 'string',
                        example: 'ton@example.com'
                    },
                    password: {
                        type: 'string',
                        example: '123456'
                    }
                }
            },
            CreateUserOutput: {
                type: 'object',
                properties: {
                    id: {
                        type: 'string',
                        example: '57102d39-4d96-4385-b088-0e9e2e3c9611'
                    }
                }
            },
            GetUserOutput: {
                type: 'object',
                properties: {
                    id: {
                        type:'string',
                        example: '57102d39-4d96-4385-b088-0e9e2e3c9611'
                    },
                    name: {
                        type:'string',
                        example: 'ton'
                    },
                    email: {
                        type:'string',
                        example: 'ton@example.com'
                    },
                    isAdmin: {
                        type: 'integer',
                        example: 0
                    }
                }
            }
        }
    }
}