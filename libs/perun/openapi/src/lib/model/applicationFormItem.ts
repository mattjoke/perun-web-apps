/**
 * Perun RPC API
 * Perun Remote Procedure Calls Application Programming Interface
 *
 * The version of the OpenAPI document: 3.19.0
 * Contact: perun@cesnet.cz
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { ItemTexts } from './itemTexts';
import { Type } from './type';
import { AppType } from './appType';


export interface ApplicationFormItem { 
    id?: number;
    shortname?: string;
    required?: boolean;
    type?: Type;
    federationAttribute?: string;
    perunSourceAttribute?: string;
    perunDestinationAttribute?: string;
    regex?: string;
    applicationTypes?: Array<AppType>;
    ordnum?: number;
    i18n?: { [key: string]: ItemTexts; };
    forDelete?: boolean;
}

