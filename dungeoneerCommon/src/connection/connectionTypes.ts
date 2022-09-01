/**
 * These are based on extended versions of the JsonRPC 2.0 interface as defined here:
 * 
 * https://www.jsonrpc.org/specification
 */

 export interface DmResponse {
    // unique code that should be the same as the request that was sent out.
    // sometimes requests don't provide an id, or sometimes the server wants to send an error or message anyway, hence
    // the id optional
    id?: string
  
    // error object only present if there is an error, otherwise send result object
    error?: DmError
  
    // only send this if no error
    result?: any
  
    // a place to put extended logic (see below)
    data?: DmResponseData
  }
  
  export interface DmResponseData {
    // Set to true if more responses are expected
    notFinal?: boolean

    // this is for the server to inform the client that the request has been received
    messageReceived?: boolean
  }
  
  export interface DmError {
    // error code. I guess we make these up!
    code: number
  
    // message describing the error. Should be short and sweet
    message: string
  
    // optional additional data
    data?: any
  }
  
  export interface DmRequest {
    // generate unique id for the request. Omit if you do not expect a response
    id?: string
  
    // what method is to be called on the server
    method: string
  
    // the paramaters for the method
    params?: any
  }
  
  export interface DmFetchParams {
    // required value. which node type are we fetching
    nodeType: string
  
    // optional search parameters
    search?: any
  
    // modality modifies how much data the query generator retrieves
    modality?: 'minimal' | 'table' | 'full'

    pagination?: DmPagination
  
    filterOverride?: any
  }

  // pagination values based on dgraph standards
  export interface DmPagination {
    // where you start
    offset: number

    // how many you fetch
    first: number
  }
  
  export interface DmSetParams {
    // required
    nodeType: string

    // don't know how to type this. It depends on the schema of course
    values: {
      [key: string]: any
    }
  }

  // this is for child[] and node[] data types.
  export interface DmLinkSetParams {
    toDelete: any[]
    toModify: any[]
    toAdd: any[]
  }