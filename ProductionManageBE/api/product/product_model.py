from django.db import models

from api.base.base_model import BaseModel


class Product(BaseModel):
    prod_code = models.CharField(max_length=20, null=True)
    prod_fullname = models.CharField(max_length=255, null=True)
    hash_code = models.CharField(max_length=55, null=True)
    ingredient = models.CharField(max_length=20, null=True)
    exp = models.DecimalField(max_digits=18, decimal_places=2, null=True)
    market = models.CharField(max_length=10, null=True)
    prod_name = models.CharField(max_length=128, null=True)
    label_path = models.CharField(max_length=255, null=True)
    barcode = models.CharField(max_length=20, null=True)
    delay_m4 = models.CharField(max_length=20, null=True)
    delay_m5 = models.CharField(max_length=20, null=True)
    pack_size = models.DecimalField(max_digits=18, decimal_places=2, null=True)
    loose_uom = models.CharField(max_length=10, null=True)
    whole_uom = models.CharField(max_length=50, null=True)

    def __str__(self):
        return self.prod_code
