import {
  makeStyles,
  Theme,
  createStyles,
  Container,
  Grid,
  Button,
  Avatar,
  Typography,
  FormControlLabel,
  Radio,
} from '@material-ui/core'
import { Formik, Form, Field } from 'formik'
import { RadioGroup, TextField } from 'formik-material-ui'
import React from 'react'
import * as yup from 'yup'
import { sendRequestToUpdateUserProfile } from '../../actions/user'
import useUserContext from '../../hooks/useUserContext'

import { UserProfile } from '../../types'

type EditPageProps = {
  profileFirstName: string
  profileLastName: string
  profileCompany: string
  profileEmploymentStatus: string
  profileEmail: string
}

const editPageYupSchema = yup.object().shape({
  email: yup.string().email(),
})

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      marginTop: theme.spacing(9),
    },
    avatar: {
      height: 100,
      width: 100,
    },
  })
)

const SearchResultPage: React.FC<EditPageProps> = ({
  profileCompany,
  profileLastName,
  profileFirstName,
  profileEmploymentStatus,
  profileEmail,
}) => {
  const classes = useStyles()

  const { dispatchAsync } = useUserContext()

  const initialValues = {
    firstName: profileFirstName || '',
    lastName: profileLastName || '',
    company: profileCompany || '',
    employmentStatus: profileEmploymentStatus || '',
  }

  const onSaveChangesClick = (values: Partial<UserProfile>, actions: any) => {
    delete values.email
    dispatchAsync(sendRequestToUpdateUserProfile(values))
    actions.setSubmitting(false)
  }

  return (
    <Container className={classes.container}>
      <Avatar className={classes.avatar} />
      <Typography variant="h5">Edit profile info</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSaveChangesClick}
        validationSchema={editPageYupSchema}
      >
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={10} sm={5}>
              <Field
                component={TextField}
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={10} sm={5}>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={10}>
              <Field
                value={profileEmail}
                type="email"
                component={TextField}
                variant="outlined"
                fullWidth
                name="email"
                label="Email"
                id="email"
                disabled
              />
            </Grid>
            <Grid item xs={10}>
              <Field
                component={TextField}
                variant="outlined"
                fullWidth
                id="company"
                label="Company"
                name="company"
              />
            </Grid>
            <Grid item xs={10}>
              <Typography id="employmentStatusLabel">
                Employment Status
              </Typography>
              <Field component={RadioGroup} name="employmentStatus">
                <FormControlLabel
                  value="EMPLOYED"
                  control={<Radio />}
                  label="Employed"
                />
                <FormControlLabel
                  value="OPEN_TO_WORK"
                  control={<Radio />}
                  label="Open to work"
                />
                <FormControlLabel
                  value="FREELANCER"
                  control={<Radio />}
                  label="Freelancer"
                />
              </Field>
            </Grid>

            <Grid item xs={10}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Save changes
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  )
}

export default SearchResultPage
