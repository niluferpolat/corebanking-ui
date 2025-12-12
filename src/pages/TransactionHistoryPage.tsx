import { useAccountDetailStore } from "@/store/account.detail.store";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useEffect, useRef, useState } from "react";
import { getTransactionHistory } from "@/services/TransactionService";
import { useTransactionStore } from "@/store/transaction.store";
import { TransactionStatus, type Transaction } from "@/types/TransactionType";
import moment from "moment";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { Toast } from "primereact/toast";
import TransferDialog from "@/components/TransferDialog";

function TransactionHistoryPage() {
  const accountDetailStore = useAccountDetailStore();
  const transactionStore = useTransactionStore();
  const toast = useRef<Toast>(null);
  const [isTransferDialogVisible, setIsTransferDialogVisible] = useState<boolean>(false);

  const fetchTransactions = async () => {
    try {
      if (!accountDetailStore.accountDetail?.id) {
        toast.current?.show({
          severity: "error",
          summary: "Error",
          detail: "Account detail not found",
        });
        return;
      }
      const response = await getTransactionHistory(accountDetailStore.accountDetail.id);
      transactionStore.setTransactions(response);
    } catch (e: unknown) {
      toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: e instanceof Error ? e.message : "Failed to fetch transaction history",
      });
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  const transactionDateTemplate = (row: Transaction) => {
    return <div>{moment(row.transactionDate).format("DD/MM/YYYY HH:mm:ss")}</div>;
  };
  const statusTemplate = (row: Transaction) => {
    return (
      <Tag
        value={row.transactionStatus}
        severity={row.transactionStatus === TransactionStatus.SUCCESS ? "success" : "danger"}
      />
    );
  };

  const header = (
    <div className="flex justify-end gap-2">
      <div>
        <Button
          icon="pi pi-upload"
          onClick={() => setIsTransferDialogVisible(true)}
          label="Transfer"
          raised
        />
      </div>
    </div>
  );
  return (
    <div>
      <Toast ref={toast} />
      <TransferDialog
        isVisible={isTransferDialogVisible}
        setVisible={setIsTransferDialogVisible}
        toast={toast}
      />
      <h1 className="text-2xl">
        Transaction History of{" "}
        {accountDetailStore.accountDetail?.accountName +
          "  " +
          accountDetailStore.accountDetail?.accountNumber}
      </h1>
      <DataTable
        paginator
        tableStyle={{ textAlign: "center" }}
        header={header}
        value={transactionStore.transactions}
        rows={10}
        rowsPerPageOptions={[10, 20, 50, 100]}
        className="mt-4 w-full"
      >
        <Column field="fromAccount" header="Sender" />
        <Column field="toAccount" header="Recipient" />
        <Column field="amount" header="Amount" />
        <Column header="Transaction Date" field="transactionDate" body={transactionDateTemplate} />
        <Column header="Status" field="transactionStatus" body={statusTemplate} />
      </DataTable>
    </div>
  );
}

export default TransactionHistoryPage;
