# myapp/signals.py

from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver

from api.base.base_model import BaseModel

@receiver(pre_save)
def set_updated_by(sender, instance, **kwargs):
    if isinstance(instance, BaseModel):
        return
        # request = getattr(instance, '_request', None)
        # if request and request.user and request.user.is_authenticated:
        #     instance.updated_by = request.user

@receiver(post_save)
def set_created_by(sender, instance, created, **kwargs):
    if isinstance(instance, BaseModel) and created:
        return
        # request = getattr(instance, '_request', None)
        # if request and request.user and request.user.is_authenticated:
        #     instance.created_by = request.user
        #     instance.save()
