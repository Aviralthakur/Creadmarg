package com.admin.service;

import com.admin.entity.EmailLog;
import com.admin.entity.Employee;
import com.admin.entity.Vendor;
import com.admin.repository.EmailLogRepository;
import com.admin.repository.EmployeeRepository;
import com.admin.repository.VendorRepository;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Valid;
import jakarta.validation.Validator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Service
public class AdminService {

    private Logger logger = LoggerFactory.getLogger(AdminService.class);

    @Autowired
    Validator validator;
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private VendorRepository vendorRepository;
    @Autowired
    private EmailLogRepository emailLogRepository;
    @Autowired
    private EmailService emailService;

    public Employee saveEmployee(@Valid Employee employee) {
        Set<ConstraintViolation<Employee>> violations = validator.validate(employee);
        if (!violations.isEmpty()) {
            StringBuilder sb = new StringBuilder();
            for (ConstraintViolation<Employee> violation : violations) {
                sb.append(violation.getMessage()).append("\n");
            }
            throw new IllegalArgumentException("Employee validation failed:\n" + sb.toString());
        }
        Employee employeecreated;
        try {
            logger.info("Creating Employee..");
            employeecreated=employeeRepository.save(employee);
            logger.info("Created Employee..");
        }catch (Exception e){
            throw  new RuntimeException();
        }
        return employeecreated;
    }

    public Vendor saveVendor(@Valid Vendor vendor) {
        Set<ConstraintViolation<Vendor>> violations = validator.validate(vendor);
        if (!violations.isEmpty()) {
            StringBuilder sb = new StringBuilder();
            for (ConstraintViolation<Vendor> violation : violations) {
                sb.append(violation.getMessage()).append("\n");
            }
            throw new IllegalArgumentException("Vendor validation failed:\n" + sb.toString());
        }
         Vendor vendorCreated;
        try {
            logger.info("Creating Vender..");
            vendorCreated=vendorRepository.save(vendor);
            logger.info("Created Vender..");
        }catch (Exception e){
            throw  new RuntimeException();
        }
        return vendorCreated;
    }

    public void sendEmail(String vendorEmail) {
        try {
            Vendor vendor = vendorRepository.findById(vendorEmail).orElse(new Vendor());
            if (!(vendor.getName() == null || vendor.getUpi() == null || vendor.getEmail() == null)) {
                String message = String.format("Sending payments to vendor %s at upi %s", vendor.getName(), vendor.getUpi());
                logger.info("Sending email: {}", message);
                emailService.sendEmail(vendorEmail, "Payment", message);
                EmailLog log = new EmailLog();
                log.setVendorEmail(vendorEmail);
                log.setMessage(message);
                log.setSentAt(LocalDateTime.now());
                emailLogRepository.save(log);
            } else {
                logger.info("All data is not present ...");
                throw new RuntimeException();
            }
        } catch (Exception e) {
            logger.error("Error in sending Email ..");
            throw new RuntimeException();
        }
    }

    public List<EmailLog> getEmailLogs() {
        try {
            return emailLogRepository.findAll();
        } catch (Exception e) {
            logger.error("Error in Email Logs {}", e);
        }
        return new ArrayList<>();
    }

    public List<Employee> getEmployees() {
        try {
            return employeeRepository.findAll();
        } catch (Exception e) {
            logger.error("Error in Getting Employees {}", e);
        }
        return new ArrayList<>();
    }

    public List<Vendor> getVendors() {
        try {
            return vendorRepository.findAll();
        } catch (Exception e) {
            logger.error("Error in Getting Vendors {}", e);
        }
        return new ArrayList<>();
    }


    public void deleteEmployee(String id) {
        try {
            employeeRepository.deleteById(id);
        }catch (Exception e) {
            logger.error("Error in Deleting Employee {}", e);
        }
    }

    public void deleteVendor(String id) {
        try {
            vendorRepository.deleteById(id);
        }catch (Exception e) {
            logger.error("Error in Deleting Vendor {}", e);
        }
    }

    public Vendor getVendorByEmail(String email) {
        return vendorRepository.findById(email).orElse(null);
    }

    public Employee getEmployeeByEmail(String email) {
        return employeeRepository.findById(email).orElse(null);
    }
}
