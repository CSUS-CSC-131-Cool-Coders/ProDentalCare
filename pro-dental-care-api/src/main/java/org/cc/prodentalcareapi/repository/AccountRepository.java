package org.cc.prodentalcareapi.repository;

import org.cc.prodentalcareapi.model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> { }
