from django.db import models
from django.contrib.auth.models import User
# backend/api_transactions/models.py
from django.db import models
from django.contrib.auth.models import User

class Transaction(models.Model):
    fecha = models.DateField()
    descripcion = models.CharField(max_length=255)
    monto = models.DecimalField(max_digits=10, decimal_places=2)
    tipo = models.CharField(max_length=10, choices=[('Ingreso', 'Ingreso'), ('Gasto', 'Gasto')])
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.fecha} - {self.tipo} - S/ {self.monto}'