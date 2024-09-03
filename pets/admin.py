from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group
from .models import User, Pet, Match, Message, Booking, Review

class UserAdmin(BaseUserAdmin):
    # 管理サイトで表示するフィールドの定義
    list_display = ('username', 'email', 'is_staff', 'is_active')  # 'name' を 'username' に変更
    list_filter = ('is_staff', 'is_active') 
    search_fields = ('email', 'name')
    ordering = ('email',)
    filter_horizontal = ()

    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'password1', 'password2'),
        }),
    )

# Register the new UserAdmin
admin.site.register(User, UserAdmin)
admin.site.unregister(Group)

# Register other models as before
admin.site.register(Pet)
admin.site.register(Match)
admin.site.register(Message)
admin.site.register(Booking)
admin.site.register(Review)
