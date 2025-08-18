package com.MyTutor2.service.impl;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class EmployeeList {

    private List<Employee> employees = new ArrayList<>();

    public void addEmployee(Employee employee) {
        employees.add(employee);
    }

    public String[] getEmployeeNames() {
        String[] names = new String[employees.size()];
        for (int i = 0; i < employees.size(); i++) {
            names[i] = employees.get(i).getName();
        }
        return names;
    }

    public String[] getEmployeeNamesStream() {
        return employees.stream()
                .map(Employee::getName)
                .toArray(String[]::new);
    }

    public List<Employee> getEmployeesSortedByAge() {
        return employees.stream()
                .sorted((e1, e2) -> Integer.compare(e1.getAge(), e2.getAge()))
                .toList();
    }

    public List<Employee> getEmployeesWithSalaryGreaterThan(double salary) {
        return employees.stream()
                .filter(e -> e.getSalary() > salary)
                .sorted(Comparator.comparingDouble(Employee::getSalary))
                .toList();
    }
}
