package com.controller;


import com.admin.entity.Employee;
import com.admin.entity.Vendor;
import com.admin.service.AdminService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.admin.entity.EmailLog;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/admin")
public class AdminController {
    private static Logger logger= LoggerFactory.getLogger(AdminController.class);

    @Autowired
    private AdminService adminService;

    @PostMapping("/employees")
    public Employee createEmployee(@Valid @RequestBody Employee employee) {
        return adminService.saveEmployee(employee);
    }

    @PutMapping("/employees/{email}")
    public Employee updateEmployee(@PathVariable String email, @Valid @RequestBody Employee updatedEmployee) {

        Employee existingEmployee = adminService.getEmployeeByEmail(email);

        if (existingEmployee == null) {
            logger.info("Employee not found with email: " + email);
            return null;
        }

        existingEmployee.setName(updatedEmployee.getName());
        existingEmployee.setDesignation(updatedEmployee.getDesignation());
        existingEmployee.setCtc(updatedEmployee.getCtc());

        return adminService.saveEmployee(existingEmployee);
    }

    @PostMapping("/vendors")
    public Vendor createVendor(@Valid @RequestBody Vendor vendor) {
        return adminService.saveVendor(vendor);
    }
    @DeleteMapping("/employees/{id}")
    public void deleteEmployee(@PathVariable String id) {
        adminService.deleteEmployee(id);
    }

    @DeleteMapping("/vendors/{id}")
    public void deleteVendor(@PathVariable String id) {
        adminService.deleteVendor(id);
    }
    @PostMapping("/send-email")
    public void sendEmail(@RequestBody Map<String, String> request) {
        String vendorEmail = request.get("vendorEmail");
        adminService.sendEmail(vendorEmail);
    }

    @GetMapping("/email-logs")
    public List<EmailLog> getEmailLogs() {
        return adminService.getEmailLogs();
    }

    @GetMapping("/employees")
    public List<Employee> getEmployees() {
        return adminService.getEmployees();
    }

    @GetMapping("/vendors")
    public List<Vendor> getVendors() {
        return adminService.getVendors();
    }

    @PutMapping("/vendors/{email}")
    public Vendor updateVendor(@PathVariable String email, @Valid @RequestBody Vendor updatedVendor) {
        Vendor existingVendor = adminService.getVendorByEmail(email);

        if (existingVendor == null) {
            logger.info("Vendor not found with email: " + email);
            return null;
        }

        existingVendor.setName(updatedVendor.getName());
        existingVendor.setUpi(updatedVendor.getUpi());

        return adminService.saveVendor(existingVendor);
    }
}

