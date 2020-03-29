<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Response;
use App\Helpers\Curl;

class Neptune
{
    public $application, $authToken, $quote;

    public function __construct()
    {
        $this->authToken = $this->getAuthenticationToken();
    }

    public function getAuthenticationToken()
    {
        // https://documenter.getpostman.com/view/9168/RW8DkRtt?version=latest#e13eeb2b-5128-4c95-b479-87401274484a
        $url = "https://triton.neptuneflood.com/api/v3/auth/getToken";
        $headers = array("Authorization: F38D0292-9F0A-4827-91FD-672F85115AC0");
        $authToken = Curl::get($url, $headers);
        return $authToken;
    }

    public function createQuote($application)
    {
        $this->application = $application;

        $url = "https://triton.neptuneflood.com/api/v3/rater/quotes";
        $headers = array("Authorization: " . $this->authToken);

        $postData = json_decode($this->data, true);
        $postData['application'] = $application;

        $quote = Curl::post($url, json_encode($postData, true), $headers);

        $this->quote = json_decode($quote, true);
        return $this->quote;
    }

    public $data = '{
        "agentNo": "FL0003",
        "password": "XvLl7K",

        "isDirectToConsumer": false,

        "application": {
           "addr1": "616 NE 2nd street",
           "city": "Boynton Beach",
           "state": "FL",
           "zip": "33435",
           "yearBuilt": 1959,

           "deductible": 5000,
           "hasImmediateClosing": false,
           "effectiveDate": "05/30/2020",

           "hasEC": false,
           "elevation": 1,

           "claims": "",
           "basementConstruction": "",
           "occupancy": "",
           "foundationType": "",
           "constructionType": "",
           "propertyType": "",

           "numberOfSteps": "",

           "numberOfStories": 1,
           "condoFloor": 0,
          "buildingCoverage": 500000,
          "contentCoverage": 0,
          "basementCoverage": 0,
          "poolCoverage": 0,
          "unattachedStructureCoverage": "",
          "hasOptionalTemporaryLivingExpenses": false,
          "hasOptionalReplacementCost": false,

          "firstName": "Joe",
          "lastName": "Test",
          "email": "test@test.com",
          "phone": "8135551212",
          "coApplicantFirstName": null,
          "coApplicantLastName": null,

          "isMailingSameAsProperty": true,
          "mailingAddr1": "",
          "mailingAddr2": "",
          "mailingCity": "",
          "mailingZip": "",

          "billInitial": "insured",
          "billOnRenewal": "insured",
          "deliveryMethod": "electronic",
          "paymentMethod": "credit",
          "lienholderList": []
         }
       }';
}