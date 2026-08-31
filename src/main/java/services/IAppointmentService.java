package services;

import java.util.List;
import dto.AppointmentDto;
import dto.CreateAppointmentDto;

public interface IAppointmentService {
    AppointmentDto createAppointment(CreateAppointmentDto dto);
    List<AppointmentDto> getAppointmentsByPatientNationalId(String nationalId);
	void deleteAppointment(Long id);

	
}