from django.contrib import admin
from api_transactions.models import Transaction


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'fecha', 'descripcion', 'monto', 'tipo')
    list_filter = ('tipo', 'fecha')
    search_fields = ('descripcion', 'user__username')