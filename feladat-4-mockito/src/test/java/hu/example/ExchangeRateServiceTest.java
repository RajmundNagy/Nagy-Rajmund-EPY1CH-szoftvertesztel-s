package hu.example;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ExchangeRateServiceTest {
    @Test
    void returnsConfiguredExchangeRate() {
        ExchangeRateService rates = mock(ExchangeRateService.class);
        // Kizárólag tesztadat, nem aktuális piaci árfolyam.
        when(rates.getRate("EUR", "HUF")).thenReturn(400.0);
        assertEquals(400.0, rates.getRate("EUR", "HUF"));
        verify(rates).getRate("EUR", "HUF");
        verifyNoMoreInteractions(rates);
    }
}
