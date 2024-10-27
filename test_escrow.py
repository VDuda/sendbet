import requests

requests.post(
    'https://api.escrow.com/2017-09-01/transaction',
    auth=('email address', 'api-key'),
    json={
        "parties": [
            {
                "role": "buyer",
                "customer": "me"
            },
            {
                "role": "seller",
                "customer": "keanu.reaves@test.escrow.com"
            }
        ],
        "currency": "usd",
        "description": "The sale of johnwick.com",
        "items": [
            {
                "title": "johnwick.com",
                "description": "johnwick.com",
                "type": "domain_name",
                "inspection_period": 259200,
                "quantity": 1,
                "schedule": [
                    {
                        "amount": 1000.0,
                        "payer_customer": "me",
                        "beneficiary_customer": "keanu.reaves@test.escrow.com"
                    }
                ],
                "extra_attributes": {
                    "image_url": "https://i.ebayimg.com/images/g/RicAAOSwzO5e3DZs/s-l1600.jpg",
                    "merchant_url": "https://www.ebay.com"
                }
            }
        ]
    },
)