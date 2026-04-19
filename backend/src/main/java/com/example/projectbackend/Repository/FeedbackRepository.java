package com.example.projectbackend.Repository;

import com.example.projectbackend.Entity.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackRepository extends JpaRepository<FeedBack,Long> {

}
