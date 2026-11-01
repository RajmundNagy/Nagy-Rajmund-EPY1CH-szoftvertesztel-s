package hu.example;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class BankServiceTest {
    private BankAccount account;
    private NotificationService notifications;
    private BankService service;

    @BeforeEach
    void setUp() {
        account = new BankAccount();
        notifications = mock(NotificationService.class);
        service = new BankService(notifications);
    }

    @Test
    void successfulDepositIncreasesBalanceAndSendsExactNotificationOnce() {
        service.deposit(account, 1000);
        assertEquals(1000, account.getBalance());
        verify(notifications, times(1)).send("Sikeres befizetés: 1000.0");
        verifyNoMoreInteractions(notifications);
    }

    @Test
    void multipleDepositsAddUpAndEachSendsNotification() {
        service.deposit(account, 1000);
        service.deposit(account, 500);
        assertEquals(1500, account.getBalance());
        verify(notifications).send("Sikeres befizetés: 1000.0");
        verify(notifications).send("Sikeres befizetés: 500.0");
        verifyNoMoreInteractions(notifications);
    }

    @ParameterizedTest
    @ValueSource(doubles = {0, -1, -1000, Double.NaN, Double.POSITIVE_INFINITY, Double.NEGATIVE_INFINITY})
    void failedDepositDoesNotChangeBalanceOrSendNotification(double amount) {
        account.deposit(250);
        assertThrows(IllegalArgumentException.class, () -> service.deposit(account, amount));
        assertEquals(250, account.getBalance());
        verifyNoInteractions(notifications);
    }

    @Test
    void nullAccountDoesNotSendNotification() {
        assertThrows(NullPointerException.class, () -> service.deposit(null, 100));
        verifyNoInteractions(notifications);
    }

    @Test
    void nullNotificationServiceIsRejected() {
        assertThrows(NullPointerException.class, () -> new BankService(null));
    }
}
