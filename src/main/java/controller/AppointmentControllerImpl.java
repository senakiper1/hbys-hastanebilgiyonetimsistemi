package controller;

import dto.AppointmentDto;
import dto.CreateAppointmentDto;
import services.IAppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rest/api/appointment")
public class AppointmentControllerImpl {

    @Autowired
    private IAppointmentService appointmentService;

    @PostMapping("/save")
    public ResponseEntity<?> saveAppointment(@RequestBody CreateAppointmentDto createAppointmentDto) {
        try {
            AppointmentDto savedAppointment = appointmentService.createAppointment(createAppointmentDto);
            return ResponseEntity.ok(savedAppointment);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Hata: " + e.getMessage());
        }
    }

    @GetMapping("/listByPatient/{nationalId}")
    public ResponseEntity<List<AppointmentDto>> getAppointmentsByPatient(@PathVariable String nationalId) {
        List<AppointmentDto> list = appointmentService.getAppointmentsByPatientNationalId(nationalId);
        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok().build();
    }
    
}