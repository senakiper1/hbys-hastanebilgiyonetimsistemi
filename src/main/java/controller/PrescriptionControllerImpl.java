package controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dto.PrescriptionDto;
import services.IPrescriptionService;

@RestController
@RequestMapping("/rest/api/prescription")
public class PrescriptionControllerImpl {

    @Autowired
    private IPrescriptionService prescriptionService;

    // 2. Hastanın Kendi Reçetelerini TC ile Çekmesi İçin Endpoint
    @GetMapping("/listByPatient/{nationalId}")
    public ResponseEntity<List<PrescriptionDto>> getPrescriptionsByPatient(@PathVariable String nationalId) {
        return ResponseEntity.ok(prescriptionService.getPrescriptionsByPatientNationalId(nationalId));
    }
}