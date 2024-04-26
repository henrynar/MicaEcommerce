package com.icodeap.ecommerce.backend.infrastructure.rest;

import com.icodeap.ecommerce.backend.domain.model.DataPayment;
import com.icodeap.ecommerce.backend.domain.model.URLPaypalResponse;
import com.icodeap.ecommerce.backend.infrastructure.service.PaypalService;
import com.paypal.api.payments.Links;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/payments")
public class PaypalController {
    private final PaypalService paypalService;
    private final String SUCSSESS_URL = "http://localhost:8085/api/v1/payments/success";
    private final String CANCEL_URL = "http://localhost:8085/api/v1/payments/cancel";
    @PostMapping
    public URLPaypalResponse createPaypal(@RequestBody DataPayment dataPayment){
        try {
            Payment payment = paypalService.createPayment(
                    Double.valueOf(dataPayment.getAmount()),
                    dataPayment.getCurrency(),
                    dataPayment.getMethod(),
                    "SALE",
                    dataPayment.getDescription(),
                    CANCEL_URL,
                    SUCSSESS_URL

            );
            for(Links links: payment.getLinks()){
                if(links.getRel().equals("approval_url")){
                    return new URLPaypalResponse(links.getHref());
                }
            }
        } catch (PayPalRESTException e) {
           e.printStackTrace();
        }
        return new URLPaypalResponse("http://localhost:4200");
    }

    @GetMapping("/success")
    public RedirectView paymentSuccess(
            @RequestParam("paymentId") String paymentId,
            @RequestParam("PayerID") String payertId
    ){
        try {
            Payment payment = paypalService.executePayment(paymentId, payertId);
            if(payment.getState().equals("approved")){
                return new RedirectView("http://localhost:4200/payment/success");
                //return new RedirectView("http://localhost:4200");
            }
        }catch (PayPalRESTException e){

            e.printStackTrace();
        }
        return  new RedirectView("http://localhost:4200");
    }

    @GetMapping("/cancel")
    public RedirectView paymentCancel(){
        return new RedirectView("http://localhost:4200");
    }

}
