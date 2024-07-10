import { instanceToPlain } from 'class-transformer';

/**
 * Summary
 *
 * This file handle the response of HTTP requests.
 * Standard used: JSON API https://jsonapi.org/
 *
 * Object response
 *  {
 *      success: Boolean,
 *      meta: Object,
 *      data: Object|Array,
 *      errrors: Array
 *  }
 *
 */

/**
 * Return response object when is a GET resquest
 * @param   {Object}  meta    Metadata of response
 * @param   {Object}  data    Body of response
 * @return  {Object}
 */
export const responseGET = (meta: object, data: object): object => {
  return {
    success: true,
    statusCode: null,
    data: instanceToPlain(data),
    meta,
    errors: null,
  };
};

/**
 * Return response object when found an error
 * @param   {Array}   errors    Array of errors
 * @return  {Object}
 */
export const responseError = (errors: any, statusCode: number): object => {
  return {
    success: false,
    statusCode,
    data: null,
    meta: null,
    errors,
  };
};

/**
 * Return response object when resource has been created
 * @param   {Object}    data    Data of new resource
 * @return  {Object}
 */
export const responsePOST = (data: object): object => {
  return {
    success: true,
    statusCode: null,
    data: instanceToPlain(data),
    meta: null,
    errors: null,
  };
};
