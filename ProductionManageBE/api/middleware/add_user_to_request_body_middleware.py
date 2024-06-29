# myapp/middleware/modify_request_data_middleware.py

import json
from django.utils.deprecation import MiddlewareMixin


class AddUserToRequestBodyMiddleware(MiddlewareMixin):
    def process_request(self, request):
        if request.method in ["POST", "PUT", "PATCH"]:
            if request.content_type == "application/json":
                try:
                    data = json.loads(request.body)
                    if request.user and request.user.is_authenticated:
                        if request.method == "POST":
                            data["created_by"] = request.user.id
                            data["updated_by"] = request.user.id
                        else:
                            data["updated_by"] = request.user.id
                    request._body = json.dumps(data).encode("utf-8")
                except json.JSONDecodeError:
                    pass
            elif request.content_type == "application/x-www-form-urlencoded":
                data = request.POST.copy()
                if request.user and request.user.is_authenticated:
                    if request.method == "POST":
                        data["created_by"] = request.user.id
                        data["updated_by"] = request.user.id
                    else:
                        data["updated_by"] = request.user.id
                request.POST = data
