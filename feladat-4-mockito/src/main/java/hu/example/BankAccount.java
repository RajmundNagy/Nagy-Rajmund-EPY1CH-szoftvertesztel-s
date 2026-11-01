package hu.example;

public class BankAccount {
    private double balance = 0.0;

    public void deposit(double amount) {
        validateAmount(amount);
        balance += amount;
    }

    public void withdraw(double amount) {
        validateAmount(amount);
        if (amount > balance) {
            throw new IllegalArgumentException("Nincs elegendő fedezet.");
        }
        balance -= amount;
    }

    public double getBalance() {
        return balance;
    }

    private static void validateAmount(double amount) {
        if (!Double.isFinite(amount) || amount <= 0) {
            throw new IllegalArgumentException("Az összegnek pozitív, véges számnak kell lennie.");
        }
    }
}
