package hu.example;

public interface ExchangeRateService {
    double getRate(String fromCurrency, String toCurrency);
}
