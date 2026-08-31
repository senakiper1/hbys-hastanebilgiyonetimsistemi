package controller;

import java.util.List;

import dto.AppointmentDto;
import dto.CreateAppointmentDto;

public interface IAppointmentController {
    AppointmentDto createAppointment(CreateAppointmentDto createAppointmentDto);
    List<AppointmentDto> getAllAppointments();
    AppointmentDto getAppointmentById(Long id);
    void deleteAppointment(Long id);
    
}