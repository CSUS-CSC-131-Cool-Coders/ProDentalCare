create
    database pdc;

create table account
(
    email     varchar(128) not null primary key,
    pass_hash varchar(128) not null
);

create table patient
(
    patient_id     char(9)      not null primary key,
    email_fk       varchar(128) not null,
    pass_hash      varchar(128) not null,
    fname          varchar(40)  not null,
    lname          varchar(40)  not null,
    race           varchar(40)  not null,
    marital_status varchar(40)  not null,
    dob            date         not null,
    phone_type     varchar(40)  not null,
    phone_no       varchar(11)  not null check (char_length(phone_no) <= 11 and char_length(phone_no) >= 10),
    sex            varchar(40)  not null,
    lang_code      char(2)      not null,
    weight         int          not null check (weight > 0),
    height         int          not null check (height > 0),
    country        varchar(40)  not null,
    state          varchar(40)  not null,
    city           varchar(40) not null,
    address_one    varchar(128) not null,
    address_two    varchar(128) not null,
    zip_code       varchar(5)   not null check (char_length(zip_code) = 5),
    foreign key (email_fk) references account (email)
);

create table patient_emergency_contact
(
    patient_id_fk        char(9)      not null primary key,
    emergency_email      varchar(128) not null,
    relationship         varchar(40)  not null,
    emergency_phone_type varchar(40)  not null,
    emergency_phone_no   varchar(11)  not null check (char_length(emergency_phone_no) <= 11 and
                                                      char_length(emergency_phone_no) >=
                                                      10),
    foreign key (patient_id_fk) references patient (patient_id)
);

create table roles
(
    email_fk varchar(128) not null,
    role     varchar(64)  not null,
    primary key (email_fk, role),
    foreign key (email_fk) references account (email)
);

create table payment_option
(
    card_no       varchar(16)  not null primary key,
    exp_date      date         not null,
    cvc           char(3)      not null,
    address       varchar(100) not null,
    address2      varchar(100) not null,
    city          varchar(100) not null,
    state         varchar(100) not null,
    zip           char(5)      not null,
    patient_id_fk char(9)      not null,
    foreign key (patient_id_fk) references patient (patient_id)
);


create table bills
(
    bill_id       int primary key auto_increment,
    amount        numeric     not null check (amount > 0),
    due_date      date        not null,
    status        varchar(16) not null,
    patient_id_fk char(9)     not null,
    foreign key (patient_id_fk) references patient (patient_id)
);


create table staff_member
(
    staff_id        char(9)      not null primary key,
    email_fk        varchar(128) not null,
    fname           varchar(40)  not null,
    lname           varchar(40)  not null,
    dob             date         not null,
    sex             varchar(40)  not null,
    bank_routing_no varchar(100) not null,
    bank_acc_no     varchar(100) not null,
    foreign key (email_fk) references account (email)
);

create table patient_treatment_plan
(
    patient_id_fk char(9)     not null primary key,
    plan_name     varchar(40) not null,
    staff_id_fk   char(9)     not null,
    start_date    date        not null,
    end_date      date,
    foreign key (patient_id_fk) references patient (patient_id),
    foreign key (staff_id_fk) references staff_member (staff_id)
);

create table appointments
(
    appt_id       int primary key auto_increment,
    appt_date     date         not null,
    status        varchar(20)  not null,
    dentist_notes varchar(200) not null,
    patient_id_fk char(9)      not null,
    foreign key (patient_id_fk) references patient (patient_id)
);

create table staff_appointments
(
    staff_id_fk char(9) not null,
    appt_id_fk  int     not null,
    primary key (staff_id_fk, appt_id_fk),
    foreign key (staff_id_fk) references staff_member (staff_id),
    foreign key (appt_id_fk) references appointments (appt_id)
);

create table reviews
(
    patient_id_fk char(9)      not null,
    appt_id_fk    int          not null,
    contents      varchar(200) not null,
    primary key (patient_id_fk, appt_id_fk),
    foreign key (patient_id_fk) references patient (patient_id),
    foreign key (appt_id_fk) references appointments (appt_id)
);