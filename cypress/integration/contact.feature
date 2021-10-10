Feature: End to end contact form validation

  Background:
    Given I open contact page

  Scenario Outline: Valid Form is submitted
    When I fill form with heading as '<heading>'
    And I fill form with email as '<email>'
    And I fill form with order reference as '<orderReference>'
    And I fill form with message as '<message>'
    And I submit the form
    Then I receive a successful message
    Examples:
      | heading           | email           | orderReference  | message               |
      | Customer service  | test1@mail.com  | order123        | test message          |
      | Webmaster         | test2@mail.com  | 123order        | another test message  |

  Scenario Outline: Submit an invalid form
    When I fill form with heading as '<heading>'
    And I fill form with email as '<email>'
    And I fill form with message as '<message>'
    And I submit the form
    Then I receive an error message: '<resultMessage>'
    Examples:
      | heading           | email           | message               | resultMessage                                   |
      | -- Choose --      | test1@mail.com  | test message          | Please select a subject from the list provided. |
      | Customer service  |                 | another test message  | Invalid email address.                          |
      | Customer service  | test1@mail.com  |                       | The message cannot be blank.                    |
