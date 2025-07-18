from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from core.models.transaction import Transaction
from core.serializers.transaction_serializer import TransactionSerializer

class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all().order_by('-date')
    serializer_class = TransactionSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
