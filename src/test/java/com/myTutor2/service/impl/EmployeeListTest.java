package com.myTutor2.service.impl;

import com.MyTutor2.service.impl.Employee;
import com.MyTutor2.service.impl.EmployeeList;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class EmployeeListTest {

    private EmployeeList employeeList;

    @BeforeEach
    void setUp() {
        employeeList = new EmployeeList();
        employeeList.addEmployee(new Employee("Alice", 30, 50000));
        employeeList.addEmployee(new Employee("Bob", 25, 60000));
        employeeList.addEmployee(new Employee("Charlie", 35, 40000));
    }

    @Test
    void testAddEmployee() {
        Employee newEmployee = new Employee("David", 28, 55000);
        employeeList.addEmployee(newEmployee);
        assertTrue(employeeList.getEmployeeNamesStream().length == 4);
        assertEquals("David", employeeList.getEmployeeNamesStream()[3]);
    }

    @Test
    void testGetEmployeeNames() {
        String[] names = employeeList.getEmployeeNames();
        assertArrayEquals(new String[]{"Alice", "Bob", "Charlie"}, names);
    }

    @Test
    void testGetEmployeeNamesStream() {
        String[] names = employeeList.getEmployeeNamesStream();
        assertArrayEquals(new String[]{"Alice", "Bob", "Charlie"}, names);
    }

    @Test
    void testGetEmployeesSortedByAge() {
        List<Employee> sortedByAge = employeeList.getEmployeesSortedByAge();
        assertEquals(25, sortedByAge.get(0).getAge());
        assertEquals(30, sortedByAge.get(1).getAge());
        assertEquals(35, sortedByAge.get(2).getAge());
    }

    @Test
    void testGetEmployeesWithSalaryGreaterThan() {
        List<Employee> filteredBySalary = employeeList.getEmployeesWithSalaryGreaterThan(45000);
        assertEquals(2, filteredBySalary.size());
        assertEquals("Alice", filteredBySalary.get(0).getName());
        assertEquals("Bob", filteredBySalary.get(1).getName());
    }
}