package hu.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class BankAccountTest {
    @Test void newAccountHasZeroBalance() {
        assertEquals(0.0, new BankAccount().getBalance());
    }
    @Test void depositIncreasesBalance() {
        BankAccount b = new BankAccount(); b.deposit(1000);
        assertEquals(1000, b.getBalance());
    }
    @Test void multipleDepositsAddUp() {
        BankAccount b = new BankAccount(); b.deposit(1000); b.deposit(500);
        assertEquals(1500, b.getBalance());
    }
    @Test void withdrawalReducesBalance() {
        BankAccount b = new BankAccount(); b.deposit(1000); b.withdraw(300);
        assertEquals(700, b.getBalance());
    }
    @Test void fullBalanceCanBeWithdrawn() {
        BankAccount b = new BankAccount(); b.deposit(1000); b.withdraw(1000);
        assertEquals(0, b.getBalance());
    }
    @Test void withdrawingTooMuchThrows() {
        BankAccount b = new BankAccount(); b.deposit(1000);
        assertThrows(IllegalArgumentException.class, () -> b.withdraw(1001));
        assertEquals(1000, b.getBalance());
    }
    @Test void negativeDepositThrows() {
        assertThrows(IllegalArgumentException.class, () -> new BankAccount().deposit(-10));
    }
    @Test void zeroDepositThrows() {
        assertThrows(IllegalArgumentException.class, () -> new BankAccount().deposit(0));
    }
    @Test void negativeWithdrawalThrows() {
        assertThrows(IllegalArgumentException.class, () -> new BankAccount().withdraw(-10));
    }
    @Test void zeroWithdrawalThrows() {
        assertThrows(IllegalArgumentException.class, () -> new BankAccount().withdraw(0));
    }
    @Test void nonFiniteAmountsThrow() {
        BankAccount b = new BankAccount();
        assertThrows(IllegalArgumentException.class, () -> b.deposit(Double.NaN));
        assertThrows(IllegalArgumentException.class, () -> b.deposit(Double.POSITIVE_INFINITY));
        assertThrows(IllegalArgumentException.class, () -> b.withdraw(Double.NEGATIVE_INFINITY));
    }
}
