import { useAccountDetailStore } from "@/store/account.detail.store";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { transfer } from "@/services/TransactionService";
import type { TransferRequest } from "@/types/TransactionType";
import { useTransactionStore } from "@/store/transaction.store";

interface TransferDialogProps {
  setVisible: (visible: boolean) => void;
  isVisible: boolean;
  toast: React.RefObject<Toast>;
}

function TransferDialog(props: TransferDialogProps) {
  const accountDetailStore = useAccountDetailStore();
  const transactionStore = useTransactionStore();

  const schema = yup
    .object({
      recipientAccountNumber: yup.string().required("Recipient Account Number is required"),
      amount: yup
        .number()
        .typeError("Amount must be a number")
        .positive("Amount must be positive")
        .required("Amount is required"),
      recipientName: yup.string().required("Recipient Username is required"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: yup.InferType<typeof schema>) => {
    const request: TransferRequest = {
      senderAccountId: accountDetailStore.accountDetail?.id || "",
      recipientAccountNumber: data.recipientAccountNumber,
      amount: data.amount,
      recipientUsername: data.recipientName,
    };
    try {
      const response = await transfer(request);
      props.toast.current?.show({
        severity: "success",
        summary: "Success",
        detail: "Transfer completed successfully.",
      });
      transactionStore.setTransactions([response, ...transactionStore.transactions]);
      props.setVisible(false);
    } catch (e: any) {
      props.toast.current?.show({
        severity: "error",
        summary: "Error",
        detail: e?.response?.data?.error || e?.message || "Transfer failed",
      });
    }
  };
  return (
    <div>
      <Dialog
        header="Transfer Funds"
        visible={props.isVisible}
        style={{ width: "20vw" }}
        onHide={() => {
          props.setVisible(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label>Recipient Username</label>
            <InputText
              invalid={!!errors.recipientName}
              className="w-full"
              {...register("recipientName")}
              placeholder="Recipient Username"
            />
            {errors.recipientName && (
              <p className="text-red-500 text-sm mt-1">{errors.recipientName.message}</p>
            )}
          </div>
          <div>
            <label>Recipient Account Number</label>
            <InputText
              invalid={!!errors.recipientAccountNumber}
              className="w-full"
              {...register("recipientAccountNumber")}
              placeholder="Recipient Account Number"
            />
            {errors.recipientAccountNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.recipientAccountNumber.message}</p>
            )}
          </div>
          <div>
            <label>Amount</label>
            <InputText
              invalid={!!errors.amount}
              type="number"
              className="w-full"
              {...register("amount")}
              placeholder="Amount"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount.message}</p>}
          </div>

          <div className="flex justify-end mt-4">
            <Button type="submit" label="Submit" raised />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default TransferDialog;
