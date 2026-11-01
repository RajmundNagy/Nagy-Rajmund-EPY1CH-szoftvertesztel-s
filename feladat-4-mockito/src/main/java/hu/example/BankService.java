package hu.example;

import java.util.Objects;

public class BankService {
    private final NotificationService notificationService;

    public BankService(NotificationService notificationService) {
        this.notificationService = Objects.requireNonNull(notificationService);
    }

    public void deposit(BankAccount account, double amount) {
        Objects.requireNonNull(account).deposit(amount);
        notificationService.send("Sikeres befizetés: " + amount);
    }
}
