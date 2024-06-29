from django.db import models

from api.base.base_model import BaseModel


class Customer(BaseModel):
    cust_code = models.CharField(max_length=50, null=True)
    cust_name = models.CharField(max_length=128, null=True)
    cust_company = models.CharField(max_length=128, null=True)
    cust_avatar = models.CharField(max_length=250, null=True)
    cust_add = models.CharField(max_length=250, null=True)
    payment_term = models.CharField(max_length=50, null=True)
    email_address = models.CharField(max_length=50, null=True)
    fax_no = models.CharField(max_length=50, null=True)
    tel_no = models.CharField(max_length=50, null=True)
    mobile_no = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.cust_code
