export type TransactionDetails = {
  transactionType: string;
  amount: number;
  transactionId: string;
  senderName: string;
  receiverName: string;
  balanceBefore: string;
  balanceAfter: string;
  message: string;
};

export type UserType = {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  dateOfBirth: string;
  verified?: boolean;
  verificationCode?: number;
  accountNumber?: number;
  userUniqueId?: string;
};

export type AccountDetailsType = {
  id?: number;
  balance: number;
  totalDeposit: number;
  totalWithdraw: number;
  uniqueId: string;
};

export type TransactionDetailsType = {
  id?: number;
  transactionType: string;
  amount: number;
  transactionId: string;
  senderName: string;
  receiverName: string;
  balanceBefore: number;
  balanceAfter: number;
  message: string;
  uniqueId: string;
};
