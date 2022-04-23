package com.example.beprofi.helpers;

import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;


@Component
public class CurrencyHelper {

    public Float convert(String currentCurrency, String convertCurrency, Float currentPrice) {
        System.out.println("current_currency=" + currentCurrency + ", convert_currency=" + convertCurrency + ", current_price=" + currentPrice);
        Float price = 0.0f;
        switch (currentCurrency.toLowerCase()) {
            case "kzt":
                switch (convertCurrency.toLowerCase()) {
                    case "kzt":
                        System.out.println("kzt");
                        price = currentPrice;
                        break;
                    case "rub":
                        price = currentPrice / 6.0f;
                        break;
                    case "usd":
                        price = currentPrice / 426.0f;
                        break;
                }
                break;
            case "rub":
                switch (convertCurrency.toLowerCase()) {
                    case "kzt":
                        price = currentPrice * 6.0f;
                        break;
                    case "rub":
                        price = currentPrice;
                        break;
                    case "usd":
                        price = currentPrice / 73.0f;
                        break;
                }
                break;
            case "usd":
                switch (convertCurrency.toLowerCase()) {
                    case "kzt":
                        price = currentPrice * 426.0f;
                        break;
                    case "rub":
                        price = currentPrice * 73.0f;
                        break;
                    case "usd":
                        price = currentPrice;
                        break;
                }
                break;
        }
        System.out.println("price: " + price);

        return price;
    }


}
