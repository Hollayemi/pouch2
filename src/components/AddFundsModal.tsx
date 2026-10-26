import * as Clipboard from 'expo-clipboard';
import { Building2, Check, Copy, ShieldAlert, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { walletAccount } from '../data/wallet';
import { colors } from '../theme/colors';

export function AddFundsModal({ visible, kycVerified, onClose, onKycRequired }: { visible: boolean; kycVerified: boolean; onClose: () => void; onKycRequired: () => void }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (visible) setCopied(false);
  }, [visible]);

  const copyAccountNumber = async () => {
    if (!kycVerified) return;
    await Clipboard.setStringAsync(walletAccount.accountNumber);
    setCopied(true);
  };

  const goToKyc = () => {
    onClose();
    onKycRequired();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View className="flex-1 justify-end bg-black/45">
        <Pressable accessibilityLabel="Close add funds information" onPress={onClose} className="absolute inset-0" />
        <View className="rounded-t-[28px] bg-canvas px-[22px] pb-10 pt-4">
          <View className="mb-5 h-1.5 w-12 self-center rounded-full bg-[#C8CED8]" />
          <View className="mb-5 flex-row items-center justify-between">
            <View>
              <Text className="text-[25px] font-extrabold text-ink">{kycVerified ? 'Add Funds' : 'KYC Required'}</Text>
              <Text className="mt-1 text-sm text-muted">{kycVerified ? 'Fund your Pouch wallet by bank transfer.' : 'Verify your identity before funding your wallet.'}</Text>
            </View>
            <Pressable accessibilityLabel="Close" onPress={onClose} className="h-10 w-10 items-center justify-center rounded-full bg-soft active:opacity-70"><X size={21} color={colors.ink} /></Pressable>
          </View>

          {!kycVerified ? (
            <View className="items-center rounded-2xl border border-border bg-white px-6 py-8 shadow">
              <View className="h-16 w-16 items-center justify-center rounded-full bg-danger-soft"><ShieldAlert size={31} color={colors.red} /></View>
              <Text className="mt-5 text-center text-xl font-extrabold text-ink">Complete identity verification</Text>
              <Text className="mt-2 text-center text-sm leading-6 text-muted">Your personal Pouch wallet account becomes available after KYC has been approved.</Text>
              <Pressable onPress={goToKyc} className="mt-6 min-h-12 w-full items-center justify-center rounded-lg bg-brand active:opacity-80">
                <Text className="text-sm font-bold text-white">Go to Profile</Text>
              </Pressable>
            </View>
          ) : <>
            <View className="mb-5 flex-row gap-3 rounded-xl bg-soft-blue p-4">
              <Building2 size={22} color={colors.blue} />
              <Text className="flex-1 text-sm leading-5 text-ink">Make a transfer from any Nigerian bank to the account below. Your Pouch wallet will be credited automatically.</Text>
            </View>

            <View className="rounded-2xl border border-border bg-white p-5 shadow">
            <Text className="text-xs font-bold text-muted">BANK NAME</Text>
            <Text className="mt-1 text-base font-bold text-ink">{walletAccount.bankName}</Text>
            <View className="my-4 h-px bg-[#E9EDF3]" />
            <Text className="text-xs font-bold text-muted">WALLET ACCOUNT NUMBER</Text>
            <View className="mt-1 flex-row items-center justify-between gap-4">
              <Text className="text-[28px] font-extrabold tracking-wider text-ink">{walletAccount.accountNumber}</Text>
              <Pressable accessibilityLabel="Copy wallet account number" onPress={copyAccountNumber} className="h-11 flex-row items-center gap-2 rounded-lg bg-brand px-3 active:opacity-80">
                {copied ? <Check size={18} color="#FFFFFF" /> : <Copy size={18} color="#FFFFFF" />}
                <Text className="text-xs font-bold text-white">{copied ? 'Copied' : 'Copy'}</Text>
              </Pressable>
            </View>
            <View className="my-4 h-px bg-[#E9EDF3]" />
            <Text className="text-xs font-bold text-muted">ACCOUNT NAME</Text>
            <Text className="mt-1 text-base font-bold text-ink">{walletAccount.accountName}</Text>
            </View>

            <Text className="mt-5 text-center text-xs leading-5 text-muted">Transfers to this account are credited to your Pouch wallet automatically.</Text>
          </>}
        </View>
      </View>
    </Modal>
  );
}
