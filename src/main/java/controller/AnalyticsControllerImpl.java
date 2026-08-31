package controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.DashboardSummaryDto;
import services.IAnalyticsService;

@RestController
@RequestMapping("/rest/api/analytics")
public class AnalyticsControllerImpl {

    @Autowired
    private IAnalyticsService analyticsService;

    @GetMapping("/summary")
    public DashboardSummaryDto getSummary() {
        return analyticsService.getSummary();
    }
}