DELIMITER //

CREATE TRIGGER check_language_count
AFTER INSERT ON CountryLanguage
FOR EACH ROW
BEGIN
    DECLARE language_count INT;
    SELECT COUNT(*) INTO language_count FROM CountryLanguage WHERE countrycode = NEW.countrycode;

    IF language_count >= 10 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'The country now has 10 or more languages. Please take note.';
    END IF;
END;
//

DELIMITER ;
-- Insert statements to test the trigger
-- Assuming 'AFG' is the country code for Afghanistan

-- Insert 9 languages for country AFG
INSERT INTO CountryLanguage (countrycode, language, isofficial, percentage) VALUES
('AFG', 'Language1', 'T', 20),
('AFG', 'Language2', 'F', 15),
('AFG', 'Language3', 'F', 10),
('AFG', 'Language4', 'T', 8),
('AFG', 'Language5', 'F', 7),
('AFG', 'Language6', 'T', 6),
('AFG', 'Language7', 'F', 5),
('AFG', 'Language8', 'T', 4),
('AFG', 'Language9', 'F', 3);

-- Attempt to insert one more language for country AFG
INSERT INTO CountryLanguage (countrycode, language, isofficial, percentage) VALUES ('AFG', 'Language10', 'T', 2);
