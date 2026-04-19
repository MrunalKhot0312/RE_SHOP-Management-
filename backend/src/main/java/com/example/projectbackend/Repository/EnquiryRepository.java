package com.example.projectbackend.Repository;

import com.example.projectbackend.Entity.Enquiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {

}
