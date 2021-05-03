-- create database ace2backend;
-- use ace2backend;

-- -----------------------------------------------------
-- Table ace2backend.log
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS ace2backend.log (
  id_log INT NOT NULL AUTO_INCREMENT,
  clausula VARCHAR(1000) NULL,
  fecha date NULL,
  PRIMARY KEY (id_log))
ENGINE = InnoDB;

